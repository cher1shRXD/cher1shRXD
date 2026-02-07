"use client";

import { SubmitEventHandler, useState } from "react";
import { Mail, Send } from "lucide-react";
import { subscribeEmail } from "../actions/subscribe";

const BlogSubscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    setStatus("loading");

    try {
      const result = await subscribeEmail(email);

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

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
      <div className="bg-surface/50 border border-border rounded-xl p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-6 h-6 text-primary" />
          <h2 className="text-xl sm:text-2xl font-bold text-text">
            글이 마음에 드셨나요?
          </h2>
        </div>

        <p className="text-text/60 mb-6 text-xs md:text-sm xl:text-base">
          새로운 글이 발행되면 이메일로 알림을 받을 수 있어요.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소를 입력하세요"
            disabled={status === "loading"}
            className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-text placeholder:text-text/40 focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-primary font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer text-white text-xs md:text-sm xl:text-base">
            {status === "loading" ? (
              "구독 중..."
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>
                  구독하기
                </span>
              </>
            )}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm ${
              status === "success" ? "text-green-500" : status === "error" ? "text-red-500" : ""
            }`}>
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default BlogSubscribe;
