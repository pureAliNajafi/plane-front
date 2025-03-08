"use client";

import useCounterStore from "@/store/counterStore";

export default function Counter() {
  const { increment, decrement, reset } = useCounterStore();

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg">
      <div className="flex space-x-4">
        <button onClick={increment} className="px-4 py-2 bg-blue-500 text-white rounded">
          +
        </button>
        <button onClick={decrement} className="px-4 py-2 bg-red-500 text-white rounded">
          -
        </button>
        <button onClick={reset} className="px-4 py-2 bg-gray-500 text-white rounded">
          Reset
        </button>
      </div>
    </div>
  );
}
