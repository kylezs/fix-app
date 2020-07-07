# Setting up for Development

1. Copy the `env.example` file into a file called `.env` in the root of the project (where `.env.example` is now).
2. Replace the values with values for your elasticsearch index. The user must have create_doc permissions, and if the index doesn't exist (i.e. you want it created on the first document push) it will require create index permissions.
