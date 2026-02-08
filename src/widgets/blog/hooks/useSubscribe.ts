import { SubmitEventHandler, useState } from "react";
import { EMAIL_REGEX } from "../constants/regex";
import { BlogApi } from "@/entities/blog/api";

export const useSubscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!email.trim() || !EMAIL_REGEX.test(email)) {
      setStatus("error");
      setMessage("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    setStatus("loading");

    try {
      const result = await BlogApi.subscribeEmail(email);

      if (result.success) {
        setStatus("success");
        setMessage(result.message || "구독해주셔서 감사합니다!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(
          result.error || "구독 신청에 실패했습니다. 다시 시도해주세요.",
        );
      }
    } catch {
      setStatus("error");
      setMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return {
    email,
    setEmail,
    status,
    message,
    handleSubmit,
  }
};
