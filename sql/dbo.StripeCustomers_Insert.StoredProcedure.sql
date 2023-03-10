CREATE proc [dbo].[StripeCustomers_Insert]
		@UserId int
		,@CustomerId varchar(50)
		,@Id int OUTPUT

		/* Test Code
			declare @UserId int = 77
					,@CustomerId varchar(50) = 'test999999999'
			execute dbo.StripeCustomers_Insert @UserId, @CustomerId
			
			select *
			from dbo.StripeCustomers
		
		*/
as
begin


		INSERT INTO dbo.StripeCustomers
				   (UserId
				   ,CustomerId)
			 VALUES
				   (@UserId
				   ,@CustomerId)
			SET @Id = SCOPE_IDENTITY();


end

GO
