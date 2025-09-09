"use client";

function Page() {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="font-bebas-neue text-6xl font-bold text-light-100">
          Whoa, you're doing that too fast!
        </h1>
        <p className="mt-3 text-lg max-w-xl mx-auto">
          No need to worry, just try it again in a few seconds.
        </p>

        <div className="mt-5">
          <button
            onClick={() => window.history.back()}
            type="button"
            className="form-btn !w-fit mt-4 px-4"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}

export default Page;
