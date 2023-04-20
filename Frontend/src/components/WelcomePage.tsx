import React from 'react';
// import { Link } from 'react-router-dom';
const WelcomePage = () => {
    return (
    <>
    <div className="hero min-h-screen bg-base-200 z-5">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">Login to an existing account to view your personal records, and compare results on the leaderboard. You can even create quizzes for others to play! Ready to get quizzlin?</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input type="text" id="username" placeholder="username" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="text" id="password" placeholder="password" className="input input-bordered" />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                        <label className="label justify-center">
                            {/* <Link to="/signup" className="label-text-alt link link-hover">Sign Up</Link> */}
                        </label>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>)
}

export default WelcomePage;