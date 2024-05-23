import React, {useState} from 'react';



const HandleAnagram = () => {

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckAnagrams = async () => {
    try{
    const response = await fetch('http://localhost:8081/checkAnagrams', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ str1: input1, str2: input2 }),
    });
    if(!response.ok) {
        throw new Error('An error occured while fecthing the result');
    }
    const data = await response.json();
    setResult(data);
    setError(null);
} catch (error){
    setResult(null);
    setError('An error occured while fecthing the result');
}
};

return (
    <div>
        <h2> Anagram Checker </h2>
        <input 
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder="enter first string"
        />
        <br />
        <input 
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="enter second string"
        />
        <br />
        <button onClick={handleCheckAnagrams}>Check Anagrams</button>
        {error && <p>{error}</p>}
        {result !== null && (
            <p>{result ? 'The Strings are anagrams!' : 'The Strings are not anagrams.'}</p>
        )}

    </div>
);
};


export default HandleAnagram;