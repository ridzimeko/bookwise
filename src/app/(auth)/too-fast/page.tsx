import React from "react";

function Page() {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
          Whoa, you're doing that too fast!
        </h1>
        <p className="mt-3 max-w-xl">
          Looks like you're trying to do that too fast. Please wait a little
          while before trying again.
        </p>
      </div>
    </main>
  );
}

export default Page;
