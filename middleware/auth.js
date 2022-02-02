import axios from "axios";
import { getSession } from "next-auth/react";

export default async (req, res, next) => {
  const data = await getSession({ req });
  if (data) {
    const baseURL = process.env.RESOURCE_PROTECTED_URL;
    const { accessToken: token } = data;
    const fetcher = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    req.fetcher = fetcher;
    next();
  } else {
    res.status(401).json({ code: 404, message: "not authorized" });
  }
};
