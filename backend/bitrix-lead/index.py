import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на почту info@softplus.systems через SMTP."""

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

    lines = [
        f'Имя: {name}',
        f'Компания: {company}' if company else None,
        f'Контакт: {contact_value}',
    ]
    if task or message:
        lines += ['', 'Сообщение:', task or message]

    text_body = '\n'.join(l for l in lines if l is not None)
    subject   = f'Заявка с сайта — {name}' + (f' ({company})' if company else '')

    to_addr   = 'info@softplus.systems'
    smtp_user = os.environ['SMTP_USER']
    smtp_pass = os.environ['SMTP_PASS']
    smtp_host = os.environ.get('SMTP_HOST', 'smtp.yandex.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From']    = smtp_user
    msg['To']      = to_addr
    msg.attach(MIMEText(text_body, 'plain', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as s:
        s.login(smtp_user, smtp_pass)
        s.sendmail(smtp_user, [to_addr], msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True}, ensure_ascii=False),
    }
