These are example curl commands for testing

- Add new task
  `curl -X POST -H "Content-Type: application/json" -d '{"title":"TITLE"}' http://localhost:3000/task`
- Delete a task given ID
  `curl -X DELETE http://localhost:3000/task/{id}`
- Update a task given ID
  `curl -X PUT -H "Content-Type: application/json" -d '{"ATTRIBUTE":VALUE}' http://localhost:3000/task/{id}`
- Retrieve a task given ID
  `curl -X GET http://localhost:3000/task/{id}`
- Retrieve all tasks
  `curl -X GET http://localhost:3000/tasks`
- Retrieve all tasks that are pending/completed
  `curl -X GET http://localhost:3000/tasks?status={pending/completed}`
