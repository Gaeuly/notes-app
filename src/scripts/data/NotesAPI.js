class NotesAPI {
  constructor() {
    this.baseUrl = 'https://notes-api.dicoding.dev/v2';
  }

  async getNotes() {
    const response = await fetch(`${this.baseUrl}/notes`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data;
  }

  async createNote(note) {
    const response = await fetch(`${this.baseUrl}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data;
  }

  async deleteNote(noteId) {
    const response = await fetch(`${this.baseUrl}/notes/${noteId}`, {
      method: 'DELETE',
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.message;
  }
}

export default NotesAPI;