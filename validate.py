import re

def validate_post(str):
    if str == '':
        return 'empty'
    if len(str) > 50:
        return 'too_long'
    return 'ok'

def validate_email(str):
    email_regex = re.compile(r'''(
                                [a-zA-Z0-9._%+-]+      # username
                                @                      # @ symbol
                                [a-zA-Z0-9.-]+         # domain name
                                (\.[a-zA-Z]{2,6})      # dot-something
                                )''', re.VERBOSE)

    if email_regex.match(str):
        return True
    return False

