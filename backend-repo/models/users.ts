import { db } from "../firebase";

const userCollection = db.collection("users");

class UserModel {
  async getAll() {
    const snapshot = await userCollection.get();
    return snapshot?.docs;
  }
  async getById(id: string) {
    const docRef = userCollection.doc(id);
    const snapshot = await docRef.get();
    return snapshot?.data();
  }
  async getByEmail(email: string) {
    const snapshot = await userCollection
      .where("email", "==", email)
      .limit(1)
      .get();
    return snapshot?.docs;
  }
  async updateById(id: string, updateData: Record<string, unknown>) {
    const docRef = db.collection("users").doc(id);
    await docRef.update(updateData);
  }
}

export const userModel = new UserModel();
