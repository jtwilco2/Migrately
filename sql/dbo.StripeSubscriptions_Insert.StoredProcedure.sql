CREATE proc [dbo].[StripeSubscriptions_Insert]
				@SubscriptionId varchar(50)
				,@UserId int
				,@CustomerId varchar(50)
				,@DateCreated datetime2(7)
				,@Status nvarchar(50)
				,@PriceId varchar(50)
				,@Id int output

				/* Test Code
				DECLARE @SubscriptionId varchar(50) = 'test_subId'
				,@UserId int = 8
				,@CustomerId varchar(50) = 'test_custId'
				,@DateCreated datetime2(7) = GETUTCDATE()
				,@Status nvarchar(50) = 'paid'
				,@@PriceId varchar(50) = 'abcdefgh'
				,@Id int output

				execute [dbo].[StripeSubscriptions_Insert] @SubscriptionId
															,@UserId
															,@CustomerId
															,@DateCreated
															,@Status
															,@@PriceId
															,@Id
															
													
				select *
				from dbo.StripeSubscriptions
				*/
as
begin

			declare @DateExpire datetime2(7) = DateAdd(year, 1, @DateCreated)

			INSERT INTO [dbo].[StripeSubscriptions]
					   (SubscriptionId
					   ,UserId
					   ,CustomerId
					   ,DateCreated
					   ,DateExpire
					   ,[Status])
			SELECT @SubscriptionId
					,@UserId
					,c.Id
					,@DateCreated
					,@DateExpire
					,@Status
			FROM dbo.StripeCustomers as c
			WHERE CustomerId = @CustomerId

		SET @Id = SCOPE_IDENTITY();

				INSERT INTO dbo.StripeProductSubscription
								(ProductId
								,SubscriptionId)
					SELECT p.Id
							,@Id
					FROM dbo.StripeProducts as p
					WHERE PriceId = @PriceId

end
/*



*/
GO
