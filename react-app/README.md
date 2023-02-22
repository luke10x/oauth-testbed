# Start a project from template

Start the development in Docker compose

```bash
docker-compose up -d --force-recreate --build
```
to shell into container:
```
docker-compose exec start bash
```

To calculate hash of new file:

With git:

```bash
$ cat .gitignore | git hash-object --stdin
4d29575de80483b005c29bfcac5061cd2f45313e  
```

Or Python:

```python
from pathlib import Path
import hashlib

contents = Path(".gitignore").read_text()
print(
  hashlib.sha1(str('blob '
    + str(len(contents))
    + "\0"
    + contents).encode('utf-8')).hexdigest())

'4d29575de80483b005c29bfcac5061cd2f45313e'
```

