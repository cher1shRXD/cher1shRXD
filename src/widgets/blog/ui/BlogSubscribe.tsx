"use client";

import { Mail } from "lucide-react";
import { useSubscribe } from "../hooks/useSubscribe";

const BlogSubscribe = () => {
  const { email, setEmail, status, message, handleSubmit } = useSubscribe();

  return (
    <section className="max-w-4xl">
      <div className="flex items-center gap-2 mb-1">
        <Mail className="w-4 h-4 text-primary" />
        <h3 className="text-sm sm:text-base font-semibold text-text">
          새 글 알림 받기
        </h3>
      </div>
      <p className="mb-4 text-text/60 text-xs md:text-sm">
        글이 마음에 드셨다면 블로그를 구독하고 새로운 소식을 받아보세요.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2 flex-col md:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === "loading"}
          className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md text-text placeholder:text-text/40 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 text-sm bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer">
          {status === "loading" ? "..." : "구독 신청하기"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-2 text-xs ${
            status === "success"
              ? "text-green-500"
              : status === "error"
                ? "text-red-500"
                : ""
          }`}>
          {message}
        </p>
      )}
    </section>
  );
};

export default BlogSubscribe;
