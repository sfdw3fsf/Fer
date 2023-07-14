import React from 'react'
import { Icon } from 'react-icons-kit'
import { trash } from 'react-icons-kit/feather/trash'
export const View = ({ products, deleteProduct }) => {
    return (
        products.map(product => (
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td className='delete' onClick={() => deleteProduct(product.id)}>
                    <Icon icon={trash}></Icon>
                </td>
            </tr>
        ))
    )
}
export default View