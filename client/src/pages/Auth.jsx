import { useAuth } from "../hooks/useAuth";

export const Auth = () => {
  const {
    authMode,
    handleSubmit,
    toggleAuth,
    setAuthForm,
    authForm,
    AUTH_FORM,
    error,
    setError,
    loading,
  } = useAuth();

  return (
    <div className=" auth-page d-flex justify-content-center align-items-center h-100">
      <div className="card auth-card p-3">
        <h2>{authMode === "login" ? <>Login</> : <>Create Account</>}</h2>
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          {authMode === "register" && (
            <div className="d-flex flex-column gap-2">
              <span className="fw-bold">Choose Role</span>
              <div className="d-flex gap-3">
                <button
                  type="button"
                  className={`btn btn-secondary ${authForm.role === "poster" ? "active-role" : ""}`}
                  onClick={() => {
                    setAuthForm((current) => ({
                      ...current,
                      role: "poster",
                    }));
                  }}
                >
                  Job Poster
                </button>
                <button
                  type="button"
                  className={`btn btn-secondary ${authForm.role === "seeker" ? "active-role" : ""}`}
                  onClick={() => {
                    setAuthForm((current) => ({
                      ...current,
                      role: "seeker",
                    }));
                  }}
                >
                  Job Seeker
                </button>
              </div>
            </div>
          )}
          {authMode === "register" && (
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between">
                <label htmlFor="username">Username</label>
                {authMode !== "login" && error && (
                  <span className="fw-bold text-danger">{error}</span>
                )}
              </div>
              <input
                value={authForm.username}
                onChange={(e) => {
                  setAuthForm((current) => ({
                    ...current,
                    username: e.target.value,
                  }));
                }}
                type="text"
                className={`form-control ${error ? "border-danger" : ""}`}
                placeholder="Please enter full name"
                id="username"
              />
            </div>
          )}
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between">
              <label htmlFor="username">Email</label>
              {authMode === "login" && error && (
                <span className="fw-bold text-danger">{error}</span>
              )}
            </div>
            <input
              value={authForm.email}
              onChange={(e) =>
                setAuthForm((current) => ({
                  ...current,
                  email: e.target.value,
                }))
              }
              type="email"
              className={`form-control ${error ? "border-danger" : ""}`}
              placeholder="you@example.com"
              id="email"
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="password">Password</label>
            <input
              value={authForm.password}
              onChange={(e) =>
                setAuthForm((current) => ({
                  ...current,
                  password: e.target.value,
                }))
              }
              type="password"
              className={`form-control ${error ? "border-danger" : ""}`}
              placeholder="Min.8 characters"
              id="password"
            />
          </div>
          <button className="btn btn-secondary w-100 ">
            {!loading && (
              <span>{authMode === "login" ? <>Login</> : <>Register</>}</span>
            )}
            {loading && (
              <div className="">
                <span className="spinner-border"></span>
              </div>
            )}
          </button>
        </form>
        <span className="text-center fw-bold mt-3">
          {authMode === "login" ? (
            <>
              Dont have an account ?{" "}
              <span
                className="text-decoration-underline cursor-pointer"
                onClick={() => {
                  toggleAuth();
                  setAuthForm(AUTH_FORM);
                  setError("");
                }}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account ?{" "}
              <span
                className="text-decoration-underline cursor-pointer"
                onClick={() => {
                  toggleAuth();
                  setAuthForm(AUTH_FORM);
                  setError("");
                }}
              >
                Log in
              </span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};
