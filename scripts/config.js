/*!
 * FIND_ISS v1.0.0
 * Copyright (c) 2023 Buddhika Thanura
 * MIT Licensed
 */

import { gettingDate } from "./helper.js";
import { news_Api_Key } from "./secret.js";

export const apiUrl = "https://api.wheretheiss.at/v1/satellites/25544"; // Where_is_the ISS API key
export const mapZoomLevel = 4;
export const issIcon = "./media/International_Space_Station.png";
export const intTime = 2000;
export const noOfArticlesToShow = 4;
const newsApiKey = news_Api_Key;

const date = gettingDate();
export const newsApiParams = {
  q: "international space station",
  from: date,
  language: "en",
  sortBy: "popularity",
  apiKey: newsApiKey,
  category: "science",
};

export const newsApiUrl = `https://newsapi.org/v2/top-headlines?q=${newsApiParams.q}&
from=${newsApiParams.from}&language=${newsApiParams.language}&sortBy=${newsApiParams.sortBy}&
apiKey=${newsApiParams.apiKey}&category=${newsApiParams.category}`; //News API key
