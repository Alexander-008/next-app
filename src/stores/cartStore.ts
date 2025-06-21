import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { CartItem } from '@/types/global'

type CartState = {
  cartList: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (index: number) => void
  isItemInCart: (name: string, selectedVariant: string) => number
  updateQuantity: (index: number, quantity: number) => void 
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartList: [],
      //作用：添加商品到购物车
      addToCart: (product) => set((state) => ({ cartList: [...state.cartList, product] })),
      removeFromCart: (index) => set((state) => {
        const newCartList = [...state.cartList]
        newCartList.splice(index, 1)
        return { cartList: newCartList }
      }),
      //作用： 判断商品是否在购物车中
      isItemInCart: (name, selectedVariant): number => {
        return useCartStore.getState().cartList.findIndex(item => item.product.name === name && item.selectedVariant === selectedVariant)
      },
      //作用：更新购物车中商品的数量
      updateQuantity: (index, quantity) => set((state) => {
        const newCartList = [...state.cartList]
        newCartList[index].quantity = quantity
        return { cartList: newCartList }
      })
    }),
    {
      name: 'cart-storage'
    }
  )
)

export default useCartStore

