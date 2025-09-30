import NameInput from '@/components/NameInput';
import LiveCodingNameInput from '../../instructor-week3/live-coding/NameInput-demo';

const Week3Live = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎮 Week 3 Live Playground
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interactive Components & User Input
          </p>
          <p className="text-gray-500 mt-2">
            Try the NameInput demo below. Focus on controlled components, user input, and validation!
          </p>
        </div>
        <div className="flex flex-col items-center gap-12">
          <div>
            <NameInput />
            <p className="text-xs text-gray-400 mt-2">(Student assignment version)</p>
          </div>
          <div className="w-full max-w-md">
            <LiveCodingNameInput />
            <p className="text-xs text-gray-400 mt-2">(Instructor live-coding demo)</p>
          </div>
        </div>
      </div>
    </div>
  );
};