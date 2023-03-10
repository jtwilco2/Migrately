CREATE PROC [dbo].[StripeSubscriptions_SelectByUserIdV3]
			@UserId int

			/* TEST CODE

			DECLARE @UserId int = 77

			EXECUTE [dbo].[StripeSubscriptions_SelectByUserIdV3] @UserId
			
			*/
AS

BEGIN
	

	SELECT 
	ss.id, ss.userId, ss.CustomerId, sc.id AS scId,
	sc.CustomerId AS stripeCustId,
	sp.id, sp.Amount, sp.ProductId, sp.Term
	, ss.DateCreated, ss.DateExpire

	FROM StripeSubscriptions AS ss
	left outer join dbo.StripeProductSubscription AS sps ON sps.SubscriptionId = ss.Id
	left outer join dbo.StripeProducts AS sp ON sp.id = sps.ProductId
	left outer join dbo.StripeCustomers AS sc ON sc.id = ss.CustomerId

	ORDER BY UserId


END


GO
