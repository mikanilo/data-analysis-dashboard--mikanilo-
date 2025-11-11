import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const NameInput = () => {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("savedName");
    if (savedName) setName(savedName);
  }, []);
  useEffect(() => {
    if (name.trim().length >= 2) {
      localStorage.setItem("savedName", name);
    }
  }, [name]);
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (value.trim().length === 0) setError("Please enter your name");
    else if (value.trim().length < 2)
      setError("Name must be at least 2 characters");
    else if (value.trim().length > 30)
      setError("Name must be at most 30 characters");
    else setError("");
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.length > 0 && (!value.includes("@") || !value.includes("."))) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };
  const handleSubmit = () => {
    if (error) return;
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    setGreeting(
      `Hello, ${name.trim()}!${
        color ? ` Your favorite color is ${color}.` : ""
      }`
    );
  };
  const handleClear = () => {
    setName("");
    setEmail("");
    setColor("");
    setError("");
    setGreeting("");
    localStorage.removeItem("savedName");
    return;
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Personalize Your Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Name Input & Email Input */}
        <Input //name input
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
        />
        <Input //email input
          placeholder="Enter your email (optional)"
          value={email}
          onChange={handleEmailChange}
        />
        {/* live monitoring of character count */}
        <p className="text-xs text-gray-500 mt-1 text-right">
          {name.length} / 30 characters
        </p>
        {/* Buttons */}
        <Button onClick={handleSubmit} className="w-full">
          Say Hello
        </Button>
        <Button variant="outline" onClick={handleClear} className="w-full">
          Clear
        </Button>

        {/* Error Message */}
        {error && <p className="text-center text-red-600 text-sm">{error}</p>}

        {/*Greeting */}
        {greeting && (
          <p className="text-center text-green-600 font-medium">{greeting}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default NameInput;
