import { db } from "../firebase";
import { hashing } from "../helpers/bcrypt";
import { formatDate } from "../helpers/dayjs";

const userCollection = db.collection("users");
const initialData = [
  {
    name: "User A",
    email: "usera@mail.com",
    password: hashing("passwordusera"),
    totalAverageWeightRatings: 4.3,
    numberOfRents: 30,
    recentlyActive: formatDate({ date: "02/07/2025" }),
  },
  {
    name: "User B",
    email: "userb@mail.com",
    password: hashing("passworduserb"),
    totalAverageWeightRatings: 4.3,
    numberOfRents: 30,
    recentlyActive: formatDate({ date: "02/04/2025" }),
  },
  {
    name: "User C",
    email: "userc@mail.com",
    password: hashing("passworduserc"),
    totalAverageWeightRatings: 4.3,
    numberOfRents: 28,
    recentlyActive: formatDate({ date: "02/04/2025" }),
  },
];

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
  async updateById(payload: Record<string, unknown>) {
    const { id, ...payloadData } = payload;
    const docRef = db.collection("users").doc(String(id));
    await docRef.update({ ...payloadData });
  }
  async seed() {
    try {
      const snapshot = await userCollection.get();
      const batch = db.batch();

      if (snapshot.empty) {
        // script for empty db
        initialData?.forEach((el) => {
          const docRef = userCollection.doc();
          batch.set(docRef, el);
        });
      } else {
        // script when db is already initialized and auto overwrite by unique email (wont cause generate data with duplicate email)
        for (const user of initialData) {
          const existingDoc = await userCollection
            .where("email", "==", user.email)
            .limit(1)
            .get();
          if (!existingDoc.empty) {
            // overwrite user data with same email
            const docRef = existingDoc.docs[0].ref;
            batch.set(docRef, user, { merge: true });
          } else {
            // add new user
            const docRef = userCollection.doc();
            batch.set(docRef, user);
          }
        }
      }

      await batch.commit();
    } catch (error) {
      throw error;
    }
  }
}

export const userModel = new UserModel();
