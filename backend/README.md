# Backend

### env

```BASH
DATABASE_NAME=django_projects_management
DATABASE_USER=postgres
DATABASE_PASSWORD=12345678
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

1. Start [PostgreSQL database](https://www.postgresql.org/download/) service.
2. In the **project root direcory**, run `pipenv shell` to start the virtual environment.

3. Before the first launch:

   - run `pipenv install` to fetch the dependencies
   - add Django admin account `python manage.py createsuperuser`

4. Basic configuration and migration

```bash
python manage.py makemigrations
python manage.py migrate

```

5. Load dummy data

```bash
python manage.py load_json_data data.json
python manage.py load_json_data data.json --clean
```

5. Finally, run `python manage.py runserver 3003` to start the API application.
