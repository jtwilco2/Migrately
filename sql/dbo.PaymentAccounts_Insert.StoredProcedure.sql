CREATE proc [dbo].[PaymentAccounts_Insert]
			@AccountId nvarchar(250)
			,@PaymentTypeId int
			,@UserId int
			,@Id int output

		/* -- Test Code --
			declare @Id int = 1
					,@AccountId nvarchar = 'a'
					,@PaymentTypeId int = 1
					,@CreatedBy int = 1
			execute dbo.PaymentAccounts_Insert @Id
												,@AccountId
												,@PaymentTypeId
												,@CreatedBy

			select *
			from dbo.PaymentAccounts
		
		*/
as
begin

		INSERT INTO [dbo].[PaymentAccounts]
				   (AccountId
				   ,PaymentTypeId
				   ,CreatedBy)
		VALUES
				(@AccountId
				,@PaymentTypeId
				,@UserId)
		SET @Id = SCOPE_IDENTITY();


end
GO
