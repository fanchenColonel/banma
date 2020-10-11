import React from 'react'
import { Reducer } from './Reducer'
import { Text1 } from './Text1'
import { Text2 } from './Text2'

export const Index = () => {
    return (
        <div>
            <Reducer>
                <Text1/>
                <Text2/>
            </Reducer>
        </div>
    )
}
