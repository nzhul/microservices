import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess, onError }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );

      if (onError) {
        onError(err.response.data.errors);
      }
    }
  };

  return { doRequest, errors };
};

export default useRequest;
