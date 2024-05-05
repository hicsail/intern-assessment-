# To Do Management System

This is a simple tool designed to help users manage their tasks efficiently. Built with Node.js and Express, it supports CRUD operations allowing users to create, read, update, and delete tasks. This document provides setup instructions, usage guidelines, and contribution information.

You will have two hours for when you fork the repository to submit a pull request to this repository.
Please stay within the time limit. If you go over time, please submit the project as is. We will review the project after pull request is open.

## Pre-requisites

What you need to install the software:

Node.js (v14.x or later)
npm (v6.x or later)

## Setup

To get the project up and running, follow the steps below:

### Forking the Repository

Before setting up the project locally, you need to fork the repository to have your own copy of the codebase. Follow these steps to fork the repository:

1. Go to the original repository on GitHub.
2. In the top-right corner of the page, click Fork.
3. Choose where you want to fork the repository (to your personal account).

### Cloning the Repository

After forking the repository, you can clone it to your local machine.

## Setup Locally

To set up the project locally, follow these steps:

1. Open your terminal and navigate to the directory of this project.
2. Run npm install to install the project dependencies.
3. Copy the .env.example file to .env and update the environment variables.

```
cp .env.example .env
```

4. Run `npm start` to start the server.

Note: Database may be dropped and recreated on every server restart or on schema changes.

## Usage

## Curl Commands

Creating a Task you can use this test curl commend or use a tool like Postman

```
curl -X POST -H "Content-Type: application/json" -d '{"title":"My Task"}' http://localhost:3000/tasks
```

# Requirements

Create a Todo App todo the following requirements:

- [x] It should be possible to create a task.
- [x] It should be possible to read a task.
- [x] It should be possible to mark a task as completed.
- [x] It should be possible to update the title of task.
- [x] It should be possible to delete a task.
- [x] It should be possible to list all tasks.
- [x] It should be possible to list all completed tasks.
- [x] It should be possible to list all pending tasks.

Once completed, you can submit a pull request to the original repository.

Ensure:

- [x] The code is clean and readable.
- [x] The code is well-structured.
- [x] The code is well-commented.
- [x] Only the required files are committed.
- [x] Answer the questions in the pull request template.

We require about two hours for you to complete this project. If you go over time, please submit the project as is. We will review the project and provide feedback.