const API_BASE_URL = "https://dev.cloudio.io/v1/api"; 

const USER = {
  email: "raviraj",
  x: "80fcdacfae8e4af8b75862832459e37cl9ws1uxO+iWxSQ4xZDiXf35iosU+cScyEh9hkXlgiRmaKHE9qL5pWAdjmIxyvzE9",
  jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXMiOiJiMTJkYWJlZWI3YmI0NTI2ODI5ZWQzYjEyYjkxNGRhOXk4enlFV0tkR0VOYkE0NU5rUlZ3S3F2VW83N2NzSjJES2NQcUN4eGJ3alk9IiwiY3NyIjoiNGRiMDBkNjc0ODNkNDJhYjg3YzAyZGMyNjcyYmQ0MDVudWljL3hMTzlneUVtcmNFMnoxdHJiZFg0Nks0Tm03VW5ZMDhma1NxaytjTVdSTWtBY1FnTW4xd0U5MStLMDdHIiwib3JnIjoiOWY1YmQ1NzE3YzViNGNmMjkzNjA5MzRiN2E4YmI2YjduOEhPUVV0RlVTaWp1NG5CTW5IajZRPT0iLCJleHAiOjE3NjQyNDUyODksImlhdCI6MTc2MzY0MDQyOSwiaXNzIjoiQ2xvdWRJTyBQbGF0Zm9ybSA0LjEuMC4xNDk3In0.h7IuZ0kpgOZGMTwFrJeiI6NiV9RjFnZvYpDwCqDLJGA"
};

export const cloudioService = {

  async getTasks() {
    try {
      const body = {
        TaskRaviAlias: {
          ds: "TaskRavi",
          query: {
            filter: [],
            projection: {
              taskId: 1,
              taskTitle: 1,
              taskDesc: 1,
              deadline: 1,
              priority: 1,
              completed: 1
            },
            sort: { taskId: 1 },
            limit: 100
          }
        }
      };

      const url = `${API_BASE_URL}?x=${encodeURIComponent(USER.x)}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Application": "Training",
          "Authorization": USER.jwt
        },
        body: JSON.stringify(body)
      });

      console.log(response);

      if (!response.ok) throw new Error("Failed to load tasks");

      const json = await response.json();
      const rows = json?.data?.TaskRaviAlias?.data || [];

      return rows.map(task => ({
        id: Number(task.taskId),
        text: task.taskTitle,
        description: task.taskDesc,
        deadline: task.deadline,
        priority: task.priority,
        completed: task.completed
      }));

    } catch (error) {
      console.error("❌ Error loading tasks:", error);
      throw error;
    }
  },


  async createTask(task) {
    try {
      const body = {
        TaskRaviAlias: {
          ds: "TaskRavi",
          data: [{
            _rs: "I",
            taskId: Date.now(), // Unique ID
            taskTitle: task.text,
            taskDesc: task.description,
            deadline: task.deadline,
            priority: task.priority,
            completed: task.completed
          }]
        }
      };

      const url = `${API_BASE_URL}?x=${encodeURIComponent(USER.x)}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Application": "Training",
          "Authorization": USER.jwt
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error("Failed to create task");

      return await response.json();

    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  updateTask: async (taskId, updatedTask) => {
    try {
      const fetchBody = {
        TaskRaviAlias: {
          ds: "TaskRavi",
          query: {
            filter: [{ taskId: { is: String(taskId) } }],
            projection: {
              id: 1,
              taskId: 1,
              taskTitle: 1,
              taskDesc: 1,
              deadline: 1,
              priority: 1,
              completed: 1,
              creationDate: 1,
              createdBy: 1,
              lastUpdateDate: 1,
              lastUpdatedBy: 1
            },
            limit: 1
          }
        }
      };

      const fetchRes = await fetch(`${API_BASE_URL}?x=${encodeURIComponent(USER.x)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Application": "Training",
          "Authorization": USER.jwt
        },
        body: JSON.stringify(fetchBody)
      });

      const json = await fetchRes.json();
      const existing = json?.data?.TaskRaviAlias?.data?.[0];

      if (!existing) {
        throw new Error("Task not found on server!");
      }

     
      const updatePayload = {
        TaskRaviAlias: {
          ds: "TaskRavi",
          data: [
            {
              _rs: "U",
              id: existing.id,
              taskId: existing.taskId,              
              taskTitle: updatedTask.text,
              taskDesc: updatedTask.description,
              deadline: existing.deadline,
              priority: existing.priority,
              completed: existing.completed,
              creationDate: existing.creationDate,
              createdBy: existing.createdBy,
              lastUpdateDate: existing.lastUpdateDate, 
              lastUpdatedBy: USER.email
            }
          ]
        }
      };

      console.log("FINAL UPDATE PAYLOAD:", updatePayload);

     
      const updateRes = await fetch(`${API_BASE_URL}?x=${encodeURIComponent(USER.x)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Application": "Training",
          "Authorization": USER.jwt
        },
        body: JSON.stringify(updatePayload)
      });

      const updateJson = await updateRes.json();
      console.log("UPDATE RESPONSE:", updateJson);

      if (updateJson.status !== "OK") {
        throw new Error(updateJson.message || "Update failed");
      }

      return updateJson;

    } catch (err) {
      console.error("UPDATE TASK ERROR:", err);
      throw err;
    }
  },

  toggleTaskCompletion: async (taskId) => {
    try {
      
      const fetchBody = {
        TaskRaviAlias: {
          ds: "TaskRavi",
          query: {
            filter: [{ taskId: { is: String(taskId) } }],
            projection: {
              id: 1,
              taskId: 1,
              completed: 1,
              taskTitle: 1,
              taskDesc: 1,
              creationDate: 1,
              createdBy: 1,
              lastUpdateDate: 1,
              lastUpdatedBy: 1,
              status: 1,
              deadline: 1,
              priority: 1
            },
            limit: 1
          }
        }
      };

      const fetchRes = await fetch(`${API_BASE_URL}?x=${encodeURIComponent(USER.x)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Application": "Training",
          "Authorization": USER.jwt
        },
        body: JSON.stringify(fetchBody)
      });

      const fetchJson = await fetchRes.json();
      const existingTask = fetchJson?.data?.TaskRaviAlias?.data?.[0];
      if (!existingTask) throw new Error("Task not found!");

      
      const updatePayload = {
        TaskRaviAlias: {
          ds: "TaskRavi",
          data: [
            {
              _rs: "U",
              id: existingTask.id,
              taskId: existingTask.taskId,
              taskTitle: existingTask.taskTitle,
              taskDesc: existingTask.taskDesc,
              completed: !existingTask.completed,
              deadline: existingTask.deadline,
              priority: existingTask.priority,
              status: existingTask.status,
              creationDate: existingTask.creationDate,
              createdBy: existingTask.createdBy,
              lastUpdateDate: new Date().toISOString(),
              lastUpdatedBy: USER.email
            }
          ]
        }
      };

      const updateRes = await fetch(`${API_BASE_URL}?x=${encodeURIComponent(USER.x)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Application": "Training",
          "Authorization": USER.jwt
        },
        body: JSON.stringify(updatePayload)
      });

      const updateJson = await updateRes.json();
      console.log("TOGGLE RESPONSE:", updateJson);

      if (updateJson.status !== "OK") {
        throw new Error(updateJson.message || "Failed to toggle task");
      }

      return updateJson;

    } catch (err) {
      console.error("TOGGLE TASK ERROR:", err);
      throw err;
    }
  },



  async deleteTask(taskId) {
    try {
     
      const fetchBody = {
        TaskRaviAlias: {
          ds: "TaskRavi",
          query: {
            filter: [{ taskId: { is: String(taskId) } }],
            projection: {
              id: 1,
              taskId: 1,
              lastUpdateDate: 1
            },
            limit: 1
          }
        }
      };

      const fetchRes = await fetch(`${API_BASE_URL}?x=${encodeURIComponent(USER.x)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Application": "Training",
          "Authorization": USER.jwt
        },
        body: JSON.stringify(fetchBody)
      });

      const fetchJson = await fetchRes.json();
      const row = fetchJson?.data?.TaskRaviAlias?.data?.[0];

      if (!row) throw new Error("Task not found on server!");

      
      const deletePayload = {
        TaskRaviAlias: {
          ds: "TaskRavi",
          data: [
            {
              _rs: "D",
              id: row.id,
              taskId: row.taskId,
              lastUpdateDate: row.lastUpdateDate
            }
          ]
        }
      };

      const deleteRes = await fetch(`${API_BASE_URL}?x=${encodeURIComponent(USER.x)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Application": "Training",
          "Authorization": USER.jwt
        },
        body: JSON.stringify(deletePayload)
      });

      const deleteJson = await deleteRes.json();
      console.log("DELETE RESPONSE:", deleteJson);

      if (deleteJson.status !== "OK") {
        throw new Error(deleteJson.message || "CloudIO delete failed");
      }

      return deleteJson;

    } catch (err) {
      console.error("DELETE ERROR:", err);
      throw err;
    }
  }


};
