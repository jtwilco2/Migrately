CREATE PROC [dbo].[ClientAttorney_Insert_ByAttorneyUserId]
						@ClientId int  -- clients.id
						,@AttorneyUserId int -- users.id

AS

/*

	SELECT * from dbo.ClientAttorney

	SELECT * from dbo.AttorneyProfiles
*/

BEGIN

	INSERT INTO dbo.ClientAttorney
				(ClientId
				,AttorneyId)
	SELECT	TOP 1
		@ClientId
		,Id
	FROM dbo.AttorneyProfiles as ap
	WHERE ap.CreatedBy = @AttorneyUserId

END
GO
