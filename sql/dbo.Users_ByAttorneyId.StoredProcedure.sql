CREATE PROC [dbo].[Users_ByAttorneyId]
			@AttorneyId int

/*---TEST CODE---

DECLARE @AttorneyId int = 32

EXECUTE [dbo].[Users_ByAttorneyId]
		@AttorneyId

*/

AS

BEGIN

	SELECT u.Id AS ClientId
		,u.FirstName
		,u.Mi AS MiddleInitial
		,u.LastName
		,u.AvatarUrl
		,u.Email AS ClientEmail
		,su.Id AS ClientStatusId
		,su.Name AS ClientStatus
		,Role = (
					SELECT	r.Id AS id
							,r.Name AS name
					FROM [dbo].[Roles] AS r inner join [dbo].[UserRoles] AS ur
							ON r.Id = ur.RoleId
					WHERE u.Id = ur.UserId
					FOR JSON AUTO
				)
	FROM [dbo].[Users] AS u inner join [dbo].[UserAttorney] AS ca
								ON u.Id = ca.UserId
							inner join [dbo].[StatusTypes] AS su
										ON u.StatusId = su.Id
	WHERE ca.AttorneyId = @AttorneyId
	ORDER BY u.LastName

END


GO
