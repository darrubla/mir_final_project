import axios from "axios";

import { useEffect, useState } from "react";
import { getSubjects } from "../api/subjects";

export function LoadSubjectsList() {
  const [subjectsList, setSubjectsList] = useState([]);
  async function loadLessons() {
    try {
      const response = await getSubjects();
      setSubjectsList(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadLessons();
  }, []);
  if (subjectsList) {
    return subjectsList;
  }
}

export const locations = [
  "Teacher's location",
  "Student's location",
  "Videocall",
];
export const hours_array = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];
export const minutes_array = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];
