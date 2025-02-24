"use client"
import { useActionState } from 'react';
import {signUpCredentials} from '../../lib/actions'



export const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(
    signUpCredentials,
    null
  );
  
    return (
      <form className="space-y-4" action={formAction}>
        {state?.message && (
          <div className="p-x mb-4 text-red-800 rounded-lg bg-red-100 role='alert">
            <span className="font-medium">{state?.message}</span>
          </div>
        )}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.name}
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.email}
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.password}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-300 rounded-lg px-5 py-2.5 text-center hover:bg-blue-800"
        >
          {isPending ? "...Loading" : "Register"}
        </button>
      </form>
    );
}

