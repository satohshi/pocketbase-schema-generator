/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = new Collection({
			authAlert: {
				emailTemplate: {
					body: "<p>Hello,</p>\n<p>We noticed a login to your {APP_NAME} account from a new location:</p>\n<p><em>{ALERT_INFO}</em></p>\n<p><strong>If this wasn't you, you should immediately change your {APP_NAME} account password to revoke access from all other locations.</strong></p>\n<p>If this was you, you may disregard this email.</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>",
					subject: 'Login from a new location',
				},
				enabled: true,
			},
			authRule: '',
			authToken: {
				duration: 604800,
			},
			confirmEmailChangeTemplate: {
				body: '<p>Hello,</p>\n<p>Click on the button below to confirm your new email address.</p>\n<p>\n  <a class="btn" href="{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}" target="_blank" rel="noopener">Confirm new email</a>\n</p>\n<p><i>If you didn\'t ask to change your email address, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>',
				subject: 'Confirm your {APP_NAME} new email address',
			},
			createRule: null,
			deleteRule: null,
			emailChangeToken: {
				duration: 1800,
			},
			fields: [
				{
					autogeneratePattern: '[a-z0-9]{15}',
					hidden: false,
					id: 'text3208210256',
					max: 15,
					min: 15,
					name: 'id',
					pattern: '^[a-z0-9]+$',
					presentable: false,
					primaryKey: true,
					required: true,
					system: true,
					type: 'text',
				},
				{
					cost: 0,
					hidden: true,
					id: 'password901924565',
					max: 50,
					min: 8,
					name: 'password',
					pattern: '^\\w+$',
					presentable: false,
					required: true,
					system: true,
					type: 'password',
				},
				{
					autogeneratePattern: '[a-zA-Z0-9]{50}',
					hidden: true,
					id: 'text2504183744',
					max: 60,
					min: 30,
					name: 'tokenKey',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: true,
					system: true,
					type: 'text',
				},
				{
					exceptDomains: null,
					hidden: false,
					id: 'email3885137012',
					name: 'email',
					onlyDomains: null,
					presentable: false,
					required: true,
					system: true,
					type: 'email',
				},
				{
					hidden: false,
					id: 'bool1547992806',
					name: 'emailVisibility',
					presentable: false,
					required: false,
					system: true,
					type: 'bool',
				},
				{
					hidden: false,
					id: 'bool256245529',
					name: 'verified',
					presentable: false,
					required: false,
					system: true,
					type: 'bool',
				},
			],
			fileToken: {
				duration: 180,
			},
			id: 'pbc_590154541',
			indexes: [
				'CREATE UNIQUE INDEX `idx_tokenKey_qw7bzqk4uw` ON `passwordMax50Validation` (`tokenKey`)',
				"CREATE UNIQUE INDEX `idx_email_qw7bzqk4uw` ON `passwordMax50Validation` (`email`) WHERE `email` != ''",
			],
			listRule: null,
			manageRule: null,
			mfa: {
				duration: 1800,
				enabled: false,
				rule: '',
			},
			name: 'passwordMax50Validation',
			oauth2: {
				enabled: false,
				mappedFields: {
					avatarURL: '',
					id: '',
					name: '',
					username: '',
				},
			},
			otp: {
				duration: 180,
				emailTemplate: {
					body: "<p>Hello,</p>\n<p>Your one-time password is: <strong>{OTP}</strong></p>\n<p><i>If you didn't ask for the one-time password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>",
					subject: 'OTP for {APP_NAME}',
				},
				enabled: false,
				length: 8,
			},
			passwordAuth: {
				enabled: true,
				identityFields: ['email'],
			},
			passwordResetToken: {
				duration: 1800,
			},
			resetPasswordTemplate: {
				body: '<p>Hello,</p>\n<p>Click on the button below to reset your password.</p>\n<p>\n  <a class="btn" href="{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}" target="_blank" rel="noopener">Reset password</a>\n</p>\n<p><i>If you didn\'t ask to reset your password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>',
				subject: 'Reset your {APP_NAME} password',
			},
			system: false,
			type: 'auth',
			updateRule: null,
			verificationTemplate: {
				body: '<p>Hello,</p>\n<p>Thank you for joining us at {APP_NAME}.</p>\n<p>Click on the button below to verify your email address.</p>\n<p>\n  <a class="btn" href="{APP_URL}/_/#/auth/confirm-verification/{TOKEN}" target="_blank" rel="noopener">Verify</a>\n</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>',
				subject: 'Verify your {APP_NAME} email',
			},
			verificationToken: {
				duration: 259200,
			},
			viewRule: null,
		})

		return app.save(collection)
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_590154541')

		return app.delete(collection)
	}
)
