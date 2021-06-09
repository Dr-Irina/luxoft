import cx from "classnames";
import React from "react";

export enum EType {
	ERROR= 'error',
	WARNING= 'warning',
	INFO= 'info',
	DEBUG= 'debug',
}

export default  [
	{
		title: 'type',
		dataIndex: 'type',
		key: 'type',
		render: (item: string, record: any) => <p className={
			cx({
				'error': record.type === EType.ERROR,
				'debug': record.type === EType.DEBUG,
				'warning': record.type === EType.WARNING,
			})}
		>
			{item}
		</p>
	},
	{
		title: 'text',
		dataIndex: 'text',
		key: 'text',
	},
	{
		title: 'date',
		dataIndex: 'date',
		key: 'date',
	},
]
