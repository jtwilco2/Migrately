CREATE proc [dbo].[StripePaymentIntents_Insert]
				@AccountId varchar(50)
				,@PaymentIntentId varchar(50)
				,@ChargeId varchar (50)
				,@TransferId varchar(50)
				,@Amount int
				,@DateCreated datetime2(7)
as
begin



		INSERT INTO dbo.StripePaymentIntents
				   (AccountId
				   ,PaymentIntentId
				   ,ChargeId
				   ,TransferId
				   ,Amount
				   ,DateCreated)
			 VALUES
				   (@AccountId
				   ,@PaymentIntentId
				   ,@ChargeId
				   ,@TransferId
				   ,@Amount
				   ,@DateCreated)






end
GO
