import React from 'react'

const KEYPAD = [
    [
        {key:"q"},
        {key:"w"},
        {key:"e"},
        {key:"r"},
        {key:"t"},
        {key:"y"},
        {key:"u"},
        {key:"i"},
        {key:"o"},
        {key:"p"},
    ],
    [
        {key:"a"},
        {key:"s"},
        {key:"d"},
        {key:"f"},
        {key:"g"},
        {key:"h"},
        {key:"j"},
        {key:"k"},
        {key:"l"},
    ],
    [
        {key:"z"},
        {key:"x"},
        {key:"c"},
        {key:"v"},
        {key:"b"},
        {key:"n"},
        {key:"m"},
    ],
]

export default function Keypad({handleKeyUp,usedKeys}) {

    const handleClick = (e) => {
        handleKeyUp && handleKeyUp({key: e.target.textContent});
    }

    return (
        <div className="keypad">
            <div className="keypad-row">
                {KEYPAD[0].map((l) => {
                    const color = usedKeys[l.key];
                    return <div key={l.key} onClick={handleClick} className={color}>{l.key}</div>
                })}
            </div>
            <div className="keypad-row">
                {KEYPAD[1].map((l) => {
                    const color = usedKeys[l.key];
                    return <div key={l.key} onClick={handleClick} className={color}>{l.key}</div>
                })}
            </div>
            <div className="keypad-row">
                <div onClick={handleClick} className="width-key">Enter</div>
                {KEYPAD[2].map((l) => {
                    const color = usedKeys[l.key];
                    return <div key={l.key} onClick={handleClick} className={color}>{l.key}</div>
                })}
                <div onClick={handleClick} className="width-key">Delete</div>
            </div>
        </div>
    )
}
