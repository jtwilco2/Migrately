CREATE proc [dbo].[StripeProducts_SelectById]
			@Id int

		/* Test Code
			Declare @Id int = 1
			execute [dbo].[StripeProducts_SelectById] @Id
		*/
as
begin

		SELECT Id
			  ,[Name]
			  ,ProductId
			  ,PriceId
			  ,Amount
			  ,Term
		  FROM dbo.StripeProducts
		  WHERE Id = @Id;


end


GO
