import Image from "next/image";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src="/logo.svg" alt="Logo" width={50} height={50} />
            <h1 className="text-2xl font-semibold text-white">BookWise</h1>
          </div>

          <div className="">
            {children}
          </div>
        </div>
      </section>

      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          alt="Auth Illustration wallpaper"
          width={1000}
          height={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
}

export default layout;
