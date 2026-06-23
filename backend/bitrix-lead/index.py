import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Создаёт сделку в Битрикс24 CRM (crm.deal.add) из формы заявки на сайте."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    body = json.loads(event.get('body') or '{}')
    name    = body.get('name', '').strip()
    company = body.get('company', '').strip()
    email   = body.get('email', '').strip()
    contact = body.get('contact', '').strip()
    task    = body.get('task', '').strip()
    message = body.get('message', '').strip()

    contact_value = email or contact
    if not name or not contact_value:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и контакт обязательны'}, ensure_ascii=False),
        }

    comments = task or message

    webhook = os.environ['BITRIX_WEBHOOK_URL'].rstrip('/') + '/crm.deal.add.json'

    fields = {
        'TITLE': f'Заявка с сайта — {name}' + (f' ({company})' if company else ''),
        'COMMENTS': comments,
        'UF_CRM_CONTACT_EMAIL': contact_value,
    }
    if company:
        fields['COMPANY_TITLE'] = company

    payload = json.dumps({'fields': fields}).encode('utf-8')
    req = urllib.request.Request(webhook, data=payload, method='POST')
    req.add_header('Content-Type', 'application/json')

    with urllib.request.urlopen(req, timeout=10) as resp:
        result = json.loads(resp.read())

    deal_id = result.get('result')

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'deal_id': deal_id}),
    }
