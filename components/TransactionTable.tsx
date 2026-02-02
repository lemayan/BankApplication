import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from '@/lib/utils'
import { transactionCategoryStyles } from '@/constants'
const CategoryBadge = ({category} : CategoryBadgeProps) => {
    const {
        borderColor,
        backgroundColor,
        textColor,
        chipBackgroundColor
    }= transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default;
    return (
        <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
            <div className={cn('size-2 rounded-full ', backgroundColor)}/>
            <p className={cn('text-12 font-medium ', textColor)}>
                {category}

            </p>
            
        </div>
    )
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
    return (
        <Table>
            <TableHeader className='bg-[#f9fafb]'>
                <TableRow>
                    <TableHead className="px-4 py-3">Transaction</TableHead>
                    <TableHead className="px-4 py-3">Amount</TableHead>
                    <TableHead className="px-4 py-3">Status</TableHead>
                    <TableHead className="px-4 py-3">Date</TableHead>
                    <TableHead className="px-4 py-3 max-md:hidden">Channel</TableHead>
                    <TableHead className="px-4 py-3 max-md:hidden">Category</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((t: Transaction) => {
                    const status = getTransactionStatus(new Date(t.date));
                    const amount = formatAmount(t.amount);
                    const isDebit = t.type === 'debit';
                    return (
                        <TableRow key={t.id} className={`${isDebit || amount[0]==="-" ? 'bg-[#FFFBFA]': 'bg-[#F6FEF9]'} !hover:bg-none !border-b-DEFAULT`} >
                            <TableCell className='max-w-[250px] px-4 py-4'>
                                <div className='flex items-center gap-3'>
                                    <h1 className='text-14 truncate font-semibold text-[#344054]'>
                                        {removeSpecialCharacters(t.name)}
                                    </h1>
                                </div>
                            </TableCell>
                            <TableCell className={`px-4 py-4 font-semibold ${isDebit ? 'text-[#f04438]' : 'text-[#039855]'}`}>
                                {isDebit ? `-${amount}` : `+${amount}`}
                            </TableCell>
                            <TableCell className='px-4 py-4'>
                                <CategoryBadge category={status} />
                            </TableCell>
                            <TableCell className='min-w-32 px-4 py-4'>
                                {formatDateTime(new Date(t.date)).dateTime}
                            </TableCell>
                            <TableCell className='px-4 py-4 capitalize min-w-24'>
                                {t.paymentChannel}
                            </TableCell>
                            <TableCell className='px-4 py-4 max-md:hidden'>
                                <CategoryBadge category={t.category} />
                            </TableCell>
                            
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default TransactionTable
