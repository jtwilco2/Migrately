CREATE PROC [dbo].[ClientAttorney_Insert]
						@ClientId int  -- clients.id
						,@AttorneyId int -- attorneyProfile.id

AS

/*

	SELECT * from dbo.ClientAttorney

	SELECT * from dbo.AttorneyProfiles
*/

BEGIN

	INSERT INTO dbo.ClientAttorney
				(ClientId
				,AttorneyId)
		VALUES	(@ClientId
				,@AttorneyId)

END
GO
