CREATE proc [dbo].[PaymentAccounts_Update]
		@AccountId nvarchar(250)
		,@PaymentTypeId int
		,@UserId int
		,@Id int

		/* -- Test Code --
			DECLARE @AccountId nvarchar(250) = 'a'
					,@PaymentTypeId int = 1
					,@ModifiedBy int = 1
					,@Id int = 1
			EXECUTE dbo.PaymentAccounts_Update @AccountId
												,@PaymentTypeId
												,@ModifiedBy
												,@Id
		*/
as
begin


		UPDATE dbo.PaymentAccounts
		   SET AccountId = @AccountId
			  ,PaymentTypeId = @PaymentTypeId
			  ,DateModified = GETUTCDATE()
			  ,ModifiedBy = @UserId
		 WHERE Id = @Id


end

GO
