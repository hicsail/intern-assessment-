Please answer the following questions.

1. What is your name?
    My name is Shiwei He, my friend also call me Calvin :).
    <br>
2. How long did you work on this project?
    About 2 hours.
    <br>
3. What is the most challenging part of the project?
    The most challenging part of this project is to effectively managing error handling and ensuring that the database queries correctly reflect the intended operations. 

    For example, in the endpoint for retrieving pending tasks, the logic completed: false || null did not work as expected due to the use of the logical OR (||), which is typically not the way conditions are handled in Sequelize queries. (Later I found out it's because I only added the feature "completed" later on, so some the complete status for pre-existed tasks are null.)
    <br>
4. What did you learn from this project?
    From this project, I gained experience with building RESTful APIs using Express and Sequelize. It provided me with a better understanding of how to interact with a database using an ORM, handle asynchronous operations with aysnc mechanism, etc. Also I learn that projects can take longer than we expeceted.

    <br>
5. What would you like to add or improve in this project?
- Add due dates to task
- Add task description to tasks
- Revert mark todos in the completed list to uncompleted
- Have a UI to show the tasks and buttons
    <br>
6. What is your feedback on this project?
    I love how structured and basic this project is, and it helped a lot for revisiting the foundation of js backend, and I think it can also help interns to learn as well just by doing the accessment.
    On top of this project, I would love to work something more based on the current features, since a GTD app can have many other important features.
    <br>
7. What is your suggestion for this project?
    It would be beneficial to include authentication and authorization to ensure that tasks are secure and only accessible to authorized users. 
    Additionally, implementing more compound querying capabilities, like filtering tasks by due date or priority, could significantly enhance the usability of the application.
    If time allows, a front-end for this is also very needed to bring this project alive.
    <br>
8. Could you mark which of the following requirements you have completed?

Create a Todo App todo the following requirements:

- [x] It should be possible to create a task.
- [x] It should be possible to read a task.
- [x] It should be possible to mark a task as completed.
- [x] It should be possible to update the title of task.
- [x] It should be possible to delete a task.
- [x] It should be possible to list all tasks.
- [x] It should be possible to list all completed tasks.
- [x] It should be possible to list all pending tasks.

Once competed, you can submit a pull request to the original repository.

Ensure:

- [x] The code is clean and readable.
- [x] The code is well-structured.
- [x] The code is well-commented.
- [x] Only the required files are committed.
- [x] Answer the questions in the pull request template.