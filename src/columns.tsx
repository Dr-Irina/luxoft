import cx from "classnames";
import React from "react";

export enum EType {
	ALL = 'all',
	ERROR= 'error',
	WARNING= 'warning',
	INFO= 'info',
	DEBUG= 'debug',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default  [
	{
		title: 'type',
		dataIndex: 'type',
		key: 'type',
		render: (item: string, record: any) => <p className={
			cx({
				'tag': true,
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
