const BASE_URL = "https://notes-api.dicoding.dev/v2";

class DataApi {
  static async search() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      if (response.status >= 200 && response.status < 300) {
        const responseJson = await response.json();
        console.log(responseJson, "get notes");
        return responseJson;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async insert(title, body) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });
      if (response.status >= 200 && response.status < 300) {
        const responseJson = await response.json();
        console.log(responseJson, "insert note");
        return responseJson;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async delete(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const responseJson = await response.json();
        console.log(responseJson, "delete note");
        return responseJson;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async searchArc() {
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`);
      if (response.status >= 200 && response.status < 300) {
        const responseJson = await response.json();
        console.log(responseJson, "get archive");
        return responseJson;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async archive(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const responseJson = await response.json();
        console.log(responseJson, "archive");
        return responseJson;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async unarchive(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const responseJson = await response.json();
        console.log(responseJson, "unarchive");
        return responseJson;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default DataApi;
