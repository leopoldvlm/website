# great website probably

testing stuff and sometimes it works. most of the times it doesn't.  
i'm hopeful i'm gonna put that stuff on the internet so i'm tryna be careful.

## available right here right now

nothing :)

## soon™️

- a little note app  
    i've always been really disappointed with all the notes app i've tried.  
    i guess it's a diy kinda project. we'll see how it turns out.

- my resume  
    haha i'm supposed to finish this one soon but who cares.

## if you want to try it out

first why would you want to do that to yourself?  
but if still you want for whatever reason there you go:

1. have python (with pip) and node (with npm) ready
2. clone that repo however you like it

    ```console
    git clone git@github.com:leopoldvlm/website.git
    cd website
    ```

3. create a virtual environment

    ```console
    python3 -m venv venv
    source ./venv/Scripts/activate
    ```

4. install those packages (for both frontend and backend)

    ```console
    pip install -r requirements.txt
    cd frontend
    npm install
    ```

5. create the backend/greatewebsite/.env file matching the example below and your setup, then migrate the db

    ```console
    cd backend
    python3 manage.py makemigrations
    python3 manage.py migrate
    ```

6. run the server and suffer

    ```console
    cd backend
    python3 manage.py runserver
    cd ../frontend
    npm run
    ```

## example of .env file

```.env
SECRET_KEY=some_key
DEBUG=boolean_value
DB_NAME=some_name
DB_USER=some_user
DB_PASSWORD=some_password
DB_HOST=localhost
DB_PORT=5432
# you don't need most of this if you run it with a sqlite db
```
