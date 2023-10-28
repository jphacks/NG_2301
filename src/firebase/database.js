import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

export class location {}

/**
 * 地点取得関数
 * @param uid ユーザーのId
 * @returns {[{id, location}]} 配列
 */
export const getLocations = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const locationsRef = collection(userDocRef, "locations");
  const querySnapshot = await getDocs(
    query(locationsRef, where("delFlag", "==", 0))
  );

  const locations = [];

  // データを取得
  querySnapshot.forEach((doc) => {
    locations.push({ id: doc.id, location: doc.data().location });
  });

  return locations;
};

/**
 * 場所の追加
 * @param uid ユーザーId
 * @param location 場所
 */
export const addLocation = async (uid, location) => {
  const userDocRef = doc(db, "users", uid);
  const locationsRef = collection(userDocRef, "locations");

  await addDoc(locationsRef, {
    location: location,
    delFlag: 0,
  });
};

export const removeLocation = async (uid, locationId) => {
  const userDocRef = doc(db, "users", uid);
  const locationsRef = collection(userDocRef, "locations");
  const locationDocRef = doc(locationsRef, locationId);

  await updateDoc(locationDocRef, {
    delFlag: 1,
  });
};
