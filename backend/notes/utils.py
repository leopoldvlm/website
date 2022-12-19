from typing import Any


class LoginError(Exception):
    def __init__(self, *args: object) -> None:
        super().__init__(*args)

class AuthentificationError(Exception):
    def __init__(self, *args: object) -> None:
        super().__init__(*args)
