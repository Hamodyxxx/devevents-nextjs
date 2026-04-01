import { memo, useState } from 'react'

const Counter = () => {

    return (
        <div>
            <ButtonCounter/>
            <Child/>
        </div>
    )
}
const ButtonCounter = () => {
    const [count, setCount] = useState(0);

    function Delete(id: number) {
        console.log(id);
    }

    return <button onClick={() => Delete(5)}>
        CLick meeeeeeeee
    </button>;
}

const Child = memo(() => {
    console.log("Rerendered");

    return <span>Hello</span>
})

export default Counter