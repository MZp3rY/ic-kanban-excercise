# Kanban Exercise

Hi,

This is iconicchain's UI exercise task. The task is to create UI for a kanban board with react (https://en.wikipedia.org/wiki/Kanban_board). You can use trello.com as an example.

#### The board UI should contain two components:
- Tasks:
    - should show name and to whom the task is assigned to(can be multiple).
    - task should also have color indicator(could be label or icon in somewhere in the task), which is based on task' importance (0: green, 1: yellow/orange, 2: red)
    - Clicking a task, should open modal for editing and all of the task' fields should be editable(name, description, assigned, importance).
- Columns:
  - which contains tasks.
  - Not mandatory, but bonus: After listing tasks in the column, there should be link/button which will open modal for creating a new task for the column.

User should be able to reorder tasks(vertical drag and drop) in columns or drag task from one column to another.
UI should be visually appealing and drag and drop should have smooth UX, you can use npm package for drag-and-drop e.g. react-beautiful-dnd.

#### The BE would have following models:
- Task:
  - id
  - name
  - assigned //list of assigned users to complete the task
  - description //description of the assignment
  - importance //integer from 0 to 2
- Column:
  - id
  - task_ids
  - name
- User:
  - name
  - id

The repository doesn't contain the actual BE (*and you don't need to create one*), but all the needed endpoints for the exercise are mocked in /app/src/api folder.

## Exercise Structure
This exercise uses React, yarn, webpack and Docker. In order to run the project in your local environment **you need Docker installed** (https://docs.docker.com/engine/install/) 
- After Docker installed you first need to run command: **docker-compose build** (builds images for docker).
- To start exercise container: **docker-compose up** (now you are ready to edit the project, and the app can be accessed from localhost:9000)
- To stop container: docker-compose down
- To remove kanban-exercise image: 
  - docker-compose down
  - docker images -a
  - Check the id of kanban-exercise_app.
  - docker rmi < ID of kanban-exercise_app >

When you to add npm packages you need to go to the app container: **docker exec -it kanban.exercise.com sh**
Now you can run yarn commands like: **yarn add < package-name >**
  
React code is located in /app/src, mocked API /app/src/api
