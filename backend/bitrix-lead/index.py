import json
import os
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    """Создаёт лид в Битрикс24 CRM из формы заявки на сайте."""

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
    task    = body.get('task', '').strip()

    if not name or not email:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и e-mail обязательны'}, ensure_ascii=False),
        }

    webhook = os.environ['BITRIX_WEBHOOK_URL'].rstrip('/') + '/crm.lead.add.json'

    fields = {
        'TITLE': f'Заявка с сайта — {name}',
        'NAME': name,
        'EMAIL': [{'VALUE': email, 'VALUE_TYPE': 'WORK'}],
        'COMMENTS': task,
    }
    if company:
        fields['COMPANY_TITLE'] = company

    data = urllib.parse.urlencode({'fields': json.dumps(fields)}).encode()
    req  = urllib.request.Request(webhook, data=data, method='POST')
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')

    with urllib.request.urlopen(req, timeout=10) as resp:
        result = json.loads(resp.read())

    lead_id = result.get('result')

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'lead_id': lead_id}),
    }